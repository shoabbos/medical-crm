export type FileTyping = {
  id: number,
  file: number,
  region_name: string,
  district_name: string,
  fullname: string,
  lpu: any,
  specialist: any,
  phone: string,
  status: string,
  work_schedule: any,
  drug_store: string,
  file_item_colour: string,
  parcel: string,
  parcel_price: number,
  send_time: any,
  manager_receive_time: any,
  courier_receive_time: any,
  doctor_receive_time: any
}

export type FileUploadResponse = {
  id: number,
  file_type: string,
  file: string
}