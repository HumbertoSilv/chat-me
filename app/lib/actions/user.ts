'use server'

import { getUserProfileReq } from "../apis/api"

export const getUserProfile = async () => {
  const userInfos = await getUserProfileReq()

  return userInfos
}
