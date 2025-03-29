import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../../../firebase/FirebaseConfig'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getUserInfo, TypeInfor } from '../../Types/Users.type'

export const handleGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const loginInfo = await signInWithPopup(auth, provider)

    const userInfo: TypeInfor = loginInfo.user

    if (userInfo) {
      const userData = getUserInfo(userInfo)
      const userRef = doc(db, 'Users', userData.uid)
      await setDoc(
        userRef,
        {
          ...userData,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      )

      window.location.href = '/'
    }
  } catch (error) {
    console.error('Error signing in with Google or saving data:', error)
  }
}
