import { User } from 'firebase/auth'

export type TypeInfor = User & {
  birthDate?: string // Add birthDate property (optional)
  gender?: string // Add gender property (optional)
}

export const getUserInfo = (userInfo: TypeInfor) => {
  const uid = userInfo.uid
  const displayName = userInfo.displayName
  const email = userInfo.email
  const phoneNumber = userInfo.phoneNumber
  const emailVerified = userInfo.emailVerified
  const photoURL = userInfo.photoURL
  const createdAt = userInfo.metadata?.creationTime
  const lastLoginAt = userInfo.metadata?.lastSignInTime
  const birthDate = userInfo.birthDate ?? null
  const gender = userInfo.gender ?? null

  return {
    uid,
    displayName,
    email,
    phoneNumber,
    emailVerified,
    photoURL,
    createdAt,
    lastLoginAt,
    birthDate: birthDate, // Added
    gender: gender // Added
  }
}
