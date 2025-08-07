'use server';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, DocumentData } from 'firebase-admin/firestore';
import { Project, SiteContent } from './types';

// More robust Firebase initialization
if (getApps().length === 0) {
  try {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );
    initializeApp({
      credential: cert(serviceAccount),
    });
  } catch (error) {
    console.log('Firebase service account key not found, initializing with default credentials.');
    // This is for local development without a service account key.
    // It will use Application Default Credentials.
    // Make sure to run `gcloud auth application-default login`
    initializeApp();
  }
}

const db = getFirestore();

const projectsCollection = db.collection('projects');
const contentCollection = db.collection('content');

// ---- Projects ----
export async function getProjects(): Promise<Project[]> {
    try {
        const snapshot = await projectsCollection.orderBy('title').get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    } catch (error) {
        console.error("Error getting projects: ", error);
        // Return a default or empty array in case of error
        return [{
            id: '1',
            title: 'E-COMMERCE WEBSITE BANDAGE',
            description: "Welcome to Bandage, where fashion meets thoughtful design and user-friendly experience. Our Summer 2020 drop highlights standout collections for Men, Women, Accessories, and Kids, each built around a fusion of bold Graphic Design and refined aesthetics. Discover our Editor's Picks and Bestseller Products, curated to inspire confidence and timeless style.",
            imageUrl: 'https://i.ibb.co/68gC6D1/p1.png',
            link: 'https://e-commerce-hack-hassan-1uyq.vercel.app/',
            tags: ['Next.js', 'Tailwind CSS']
        }];
    }
}


export async function addProject(project: Omit<Project, 'id'>): Promise<string> {
  const docRef = await projectsCollection.add(project);
  return docRef.id;
}

export async function updateProject(id: string, project: Partial<Project>): Promise<void> {
  await projectsCollection.doc(id).update(project);
}

export async function deleteProject(id: string): Promise<void> {
  await projectsCollection.doc(id).delete();
}


// ---- About Content ----
export async function getAboutContent(): Promise<SiteContent['about']> {
    try {
        const doc = await contentCollection.doc('about').get();
        if (!doc.exists) {
             // Create default content if it doesn't exist
            const defaultContent: SiteContent['about'] = {
                paragraph1: "I am Hassan Zubair, an ambitious IT Developer and AI Website Maker based in Karachi, Pakistan. With a passion for building modern, responsive, and animated websites, I specialize in technologies like React.js, Next.js, and Tailwind CSS. I also develop and customize websites using Odoo for small businesses. My skill set includes AI tool integration and website automation, allowing me to create smart, user-centric digital experiences. I’ve received recognition for both leadership and communication, highlighting my ability to work effectively in teams and deliver exceptional results.",
                paragraph2: "Currently pursuing my Matriculation, I’m driven by the dream of launching a globally recognized tech company like Microsoft or Google. I constantly push myself to learn, innovate, and contribute to cutting-edge web and AI development projects. With creativity, problem-solving skills, and a strong work ethic, I strive to make a lasting impact in the tech world. You can view my work at hassan-portfolio-three.vercel.app."
            };
            await contentCollection.doc('about').set(defaultContent);
            return defaultContent;
        }
        return doc.data() as SiteContent['about'];
    } catch(error) {
        console.error("Error getting about content: ", error);
         // Return default content in case of an error
        return {
            paragraph1: "Default about content paragraph 1. There was an error fetching the content.",
            paragraph2: "Default about content paragraph 2. Please check the server logs."
        };
    }
}

export async function updateAboutContent(content: SiteContent['about']): Promise<void> {
  await contentCollection.doc('about').set(content, { merge: true });
}
