import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  try {
    const email = "admin@finance.com";
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("Admin@123", 10);

      await prisma.user.create({
        data: {
          name: "Admin User",
          email,
          password: hashedPassword,
          role: "ADMIN",
        },
      });

      console.log("Default admin user created.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
