import { NextRequest, NextResponse } from "next/server";
import { Client, Account, ID } from "appwrite";
const sdk = require('node-appwrite');

export async function POST(req) {
  try {
    const { email, password, username, role } = await req.json();
    console.log(email, password, username, role);


    const client = new sdk.Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);
    const users = new sdk.Users(client);



    // 1️⃣ Create user
    const user = await users.create({
      userId: ID.unique(),
      email,
      password,
      name: username
    });

    const result = await users.updateLabels({
      userId: user.$id,
      labels: [role]
    });
    return NextResponse.json({ success: true, userId: user.$id });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
