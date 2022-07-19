import { Request, Response } from 'express'
import { validationResult } from 'express-validator';
import pdf from 'html-pdf'


// DB
import { connect } from '../database/database'



export function indexWelcome(req: Request, res: Response): Response {
  console.log("Entro")
  return res.json('Welcome to the Api ;)');
}

export async function stopProcess(req: Request, res: Response): Promise<Response | void> {
  try {
    const app = req.body.app;
    if (app.toLowerCase() == "close") console.log(`---- STOPED PROCESS ----`), process.exit(0); else res.json({ ok: false })
  } catch (e: any) {
    console.log(`---- ERROR REGISTER ----`)
    console.log(Date())
    console.log(e.message)
  }
}