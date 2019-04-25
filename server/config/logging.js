import winston from 'winston';

// export default () => {
//   const files = new winston.transports.File({ filename: 'logfile.log' });
//   const myconsole = new winston.transports.Console();

//   winston.add(myconsole);
//   winston.add(files);
// };

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' }),
  ],
});

export default logger;
