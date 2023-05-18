import { GENDERS, ROLES, USER_STATUS } from 'enums/auth.enum'

export interface User {
  id: number
  username: string
  email: string
  avatar: string
  firstName: string
  gender: GENDERS
  lastName: string
  phoneCode: any
  phoneNumber: number
  role: ROLES
  status: USER_STATUS
}
