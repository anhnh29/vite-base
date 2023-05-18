import { ILanguage } from './language.interface'

export interface ITemplate {
  content: string
  uid: string
  subject: string
  templateCode: string
  parentId: string
  isDefault: boolean
  language: string | ILanguage
}

export type PartialTemplate = Partial<ITemplate>
export interface IParam {
  name: string
  uid?: string
  isProcessing?: boolean
}
