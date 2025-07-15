import { users, services, type User, type InsertUser, type Service, type InsertService } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createService(service: InsertService): Promise<Service>;
  getServicesByUserId(userId: number): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  updateService(id: number, updates: Partial<Service>): Promise<Service | undefined>;
  getAllServices(): Promise<Service[]>;
  getServicesWithUsers(): Promise<(Service & { user: User })[]>;
  
  sessionStore: any;
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db
      .insert(services)
      .values(insertService)
      .returning();
    return service;
  }

  async getServicesByUserId(userId: number): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .where(eq(services.userId, userId))
      .orderBy(desc(services.createdAt));
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async updateService(id: number, updates: Partial<Service>): Promise<Service | undefined> {
    const [service] = await db
      .update(services)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return service || undefined;
  }

  async getAllServices(): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .orderBy(desc(services.createdAt));
  }

  async getServicesWithUsers(): Promise<(Service & { user: User })[]> {
    return await db
      .select()
      .from(services)
      .leftJoin(users, eq(services.userId, users.id))
      .orderBy(desc(services.createdAt))
      .then(rows => rows.map(row => ({
        ...row.services,
        user: row.users!
      })));
  }
}

export const storage = new DatabaseStorage();
