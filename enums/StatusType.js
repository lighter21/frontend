export class StatusType {
  static Pending = new StatusType("PENDING");
  static Accepted = new StatusType("ACCEPTED");
  static Declined = new StatusType("DECLINED");
  static Canceled = new StatusType("CANCELED");

  constructor(status) {
    this.status = status;
  }
}
