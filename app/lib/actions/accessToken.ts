'use server'

import { createAccessTokenReq } from "../apis/api";

export const createAccessToken = async (FireBaseIDToken: string) => {
  try {
    const { access_token } = await createAccessTokenReq(FireBaseIDToken)
    return access_token

  } catch (error) {
    throw error
  }
}
