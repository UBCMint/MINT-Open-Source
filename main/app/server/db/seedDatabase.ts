import { db } from '@/app/server/db/index';
import { users } from '@/app/server/db/schema';
import * as readline from 'readline';
import * as fs from 'fs/promises';

const numberOfUsers = 10;
const randomUserUsernames: string[] = [
  'amazing-anteater', 'cool-crab', 'dapper-dolphin', 'great-giraffe', 'perfect-panda',
  'lazy-leopard', 'cute-capybara', 'playful-platypus', 'nice-narwhal', 'friendly-frog'
];
const randomUserPasswords: string[] = [
  'mytseryPass', 'ObscureString', 'encrypted_letters', 'secret-signal', 'mot-de-passe',
  'id unknown', 'contrasena', "parola-d'ordine", 'enigmaticKey', 'pasuwado'
];
const randomUserRoles: string[] = [
  'Software Engineer', 'Product Manager', 'Electrical Engineer', 'Web Developer', 'VP Engineering',
  'UX Designer', 'Signals Engineer', 'Data Scientist', 'Neuroscience Researcher', 'Clinician'ty
];

async function addUsers(): Promise<void> {
  for (let i = 0; i < numberOfUsers; i++) {
    await db.insert(users).values({
      username: randomUserUsernames[i],
      password: randomUserPasswords[i],
      email: randomUserUsernames[i] + '@mail.com',
      role: randomUserRoles[i]
    });
  }
}

const promptUser = async (query: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return await new Promise((resolve) => {
    rl.question(query, (answer: string) => {
      rl.close();
      resolve(answer);
    });
  });
};

async function deleteDatabase(): Promise<void> {
  console.log('🗑️ Deleting existing database...');
  try {
    await fs.access('main.db');
    await fs.unlink('main.db');
    console.log('✅ Existing database deleted successfully.');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.log('🚫 Database file not found.');
    } else {
      console.error('❌ Error deleting database:', error);
    }
  }
}

async function recreateDatabase(): Promise<void> {
  console.log('🔄 Recreating the database...');
  await deleteDatabase();
  console.log('📁 Creating new database file...');
  await fs.writeFile('main.db', '');
  console.log('✅ New database file created successfully.');
}

const seedDatabase = async (): Promise<void> => {
  const input = await promptUser(
    'This script will reset the database. Do you want to proceed? [y/n] '
  );

  switch (input.toLowerCase()) {
    case 'y':
      console.log('🔄 Seeding the database...');
      await recreateDatabase();
      await addUsers();
      console.log('✅ Database seeded successfully.');
      break;
    case 'n':
      console.log('🚫 Exiting the script... The database remains untouched.');
      break;
    default:
      console.log('🚫 Invalid input. Exiting the script... The database remains untouched.');
  }
};

void seedDatabase();
