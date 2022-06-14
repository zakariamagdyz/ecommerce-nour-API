const events = require("events");
const Audit = require("../../models/auditModel.js");

const audit = new events.EventEmitter();

const auditEvent = "audit";

audit.on(auditEvent, async (audit) => {
  // save to DB
  try {
    await Audit.create(audit);
  } catch (error) {
    console.log(error);
  }
});

exports.createAnAudit = ({ action, data, error, auditBy }) => {
  let status = 200;
  if (error) {
    status = error.statusCode;
    error = error.message;
  }

  audit.emmit(auditEvent, { action, data, status, error, auditBy });
};
