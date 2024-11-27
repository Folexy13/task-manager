import { Request } from "express";

export interface Config {
  dbName: string;
  dbUser: string;
  dbPass: string;
  dbHost: string;
  port: string;
  jwtSecret: string;
  environment: string;
}

export interface ITaskProps {
  title: string;
  due_date: string;
  description: string;
  status?: string;
}

export interface IUserProps {
  full_name: string;
  phone: string;
  password: string;
  role?: string;

}

export interface AuthenticatedRequest extends Request {
  user?: any; // Define the user property
}