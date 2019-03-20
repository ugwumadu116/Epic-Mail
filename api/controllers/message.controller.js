import db from '../connection';

class MessageController {
  static async getEmail(req, res) {
    try {
      const sql = 'SELECT message.subject, message.message, message.createdon, message.senderemail, inbox.status FROM message INNER JOIN inbox ON message.id = inbox.messageid AND message.receiveremail = $1';
      const bindingParameter = [req.userData.user.epicMail];
      const client = await db.connect();
      const insertedResult = await client.query(sql, bindingParameter);
      client.release();
      if (insertedResult.rowCount === 0) {
        throw new Error('No mail found');
      }
      return res.status(200).json({
        status: 200,
        data: insertedResult.rows,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }

  static async getUnreadEmail(req, res) {
    try {
      const sql = 'SELECT message.subject, message.message, message.createdon, message.senderemail, inbox.status FROM message INNER JOIN inbox ON message.id = inbox.messageid AND inbox.status = $1 ';
      const bindingParameter = ['unread'];
      const client = await db.connect();
      const insertedResult = await client.query(sql, bindingParameter);
      client.release();
      if (insertedResult.rowCount === 0) {
        throw new Error('No unread mail found');
      }
      return res.status(200).json({
        status: 200,
        message: insertedResult.rows,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }

  static async getSentEmail(req, res) {
    try {
      const sql = 'SELECT message.subject, message.message, message.createdon, message.senderemail, sent.status FROM message INNER JOIN sent ON message.id = sent.messageid AND message.senderemail = $1';
      const bindingParameter = [req.userData.user.epicMail];
      const client = await db.connect();
      const insertedResult = await client.query(sql, bindingParameter);
      client.release();
      if (insertedResult.rowCount === 0) {
        throw new Error('No sent mail found');
      }
      return res.status(200).json({
        status: 200,
        message: insertedResult.rows,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }

  static async getAnEmail(req, res) {
    try {
      const { id } = req.params;
      const sql = 'SELECT message.subject, message.message, message.createdon, message.senderemail, inbox.status FROM message INNER JOIN inbox ON message.id = $1 AND inbox.messageid = $2 AND message.receiveremail = $3';
      const bindingParameter = [id, id, req.userData.user.epicMail];
      const client = await db.connect();
      const insertedResult = await client.query(sql, bindingParameter);
      client.release();
      if (insertedResult.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Message not found',
        });
      }
      return res.status(200).json({
        status: 200,
        message: insertedResult.rows,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }

  static async PostAnEmail(req, res) {
    try {
      const {
        subject,
        message,
        receiverEmail,
      } = req.body;
      const d = new Date();
      if (req.userData.user.epicMail === req.body.receiverEmail) {
        throw new Error('you cant send mail to yourself');
      }
      const sql = 'INSERT INTO message (userid, subject, message, senderemail, receiveremail, createdon, modifieddate, parentmessageid) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
      const bindingParameter = [req.myInfos[0].id, subject, message, req.userData.user.epicMail, receiverEmail, d, d, 0];
      const client = await db.connect();
      const insertedResult = await client.query(sql, bindingParameter);
      if (insertedResult.rowCount > 0) {
        const sqlSent = 'INSERT INTO sent (senderid, messageid, createdon) VALUES ($1, $2, $3)';
        const sentDataBind = [req.myInfos[0].id, insertedResult.rows[0].id, d];
        const sqlInbox = 'INSERT INTO inbox (receiverid, messageid, createdon) VALUES ($1, $2, $3)';
        const inboxDataBind = [req.receiverInfos[0].id, insertedResult.rows[0].id, d];
        await client.query(sqlSent, sentDataBind);
        await client.query(sqlInbox, inboxDataBind);
      }
      client.release();
      return res.status(201).json({
        status: 201,
        data: insertedResult.rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }

  static async deleteAnEmail(req, res) {
    try {
      const { id } = req.params;
      const sql = 'DELETE FROM inbox WHERE inbox.messageid = $1 AND inbox.receiverid = $2';
      const bindingParameter = [id, req.userID];
      const client = await db.connect();
      const insertedResult = await client.query(sql, bindingParameter);
      if (insertedResult.rowCount === 0) {
        return res.status(400).json({
          status: 400,
          message: 'YOu cant delete this',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Deleted successfully',
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }
}
export default MessageController;
