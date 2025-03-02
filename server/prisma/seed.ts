import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  try {
    const email = "admin@local.dev";
    const existingUser = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("Asd123!@#", 10);

      await prisma.adminUser.create({
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
