export interface ISensor {
  name: string
  type: string
  externalId: string
  deviceExternalId: string
  outletId: string
}

export interface IDevice {
  name: string
  address: string
  status: string
  externalId: string
  mqttId: string
  outletId: string
}

export interface IMQTT {
  name: string
  protocol: string
  host: string
  port: string
  username: string
  password: string
  outletId: string
}

export interface IBridge {
  name: string
  mqttUri: string
  mqttTopic: string
  kafkaTopic: string
  outletId: string
}

export interface IOutlet {
  name: string
  description: string
  country: string
  city: string
  state: string
  postalCode: string
  address1: string
  address2: string
  email: string
  phone: string
  status: string
  outletId: string
  contactDateStart: string
  contactDateEnd: string
}
