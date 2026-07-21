import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load .env from backend root
dotenv.config();

// Debug check
console.log('MONGODB_URI =', process.env.MONGODB_URI);

const { connectDB } = await import('../config/database.js');
const { User, Team, Project } = await import('../models/index.js');

const seedData = async () => {
  try {
    const conn = await connectDB();
    if (!conn || mongoose.connection.readyState !== 1) {
      console.error('❌ Cannot run seed script: MongoDB is not connected.');
      process.exit(1);
    }

    console.log('🌱 Starting database seeding...');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Project.deleteMany({});

    console.log('✓ Cleared existing data');

    const salt = await bcrypt.genSalt(10);

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@alchemii.com',
      password: 'Admin@123',
      role: 'Admin',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      github: 'https://github.com/mrgraciz123',
      linkedin: 'https://linkedin.com',
      bio: 'ALCHEMII Admin',
      isActive: true
    });

    console.log('✓ Admin user created');

    // Keep the rest of your code exactly the same...

    const teamMembers = [

      {
        name: 'Tanu Mishra',
        email: 'tanumishra8700@gmail.com',
        role: 'Frontend Developer',
        github: 'https://github.com/mishratanu',
        linkedin: 'https://www.linkedin.com/in/tanu-mishra-683112330/',
        bio: 'Passionate Frontend Developer dedicated to creating responsive, accessible, and user-friendly web applications with modern technologies and clean, efficient code.',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Git'],
        year: 3
      },
      {
        name: 'Vanshika Saxena',
        email: 'vs.vs9411@gmail.com',
        role: 'Frontend Engineer',
        github: 'https://github.com/vanshikacs',
        linkedin: 'https://linkedin.com/in/vanshika',
        bio: 'React specialist and UI/UX enthusiast',
        skills: ['React', 'JavaScript', 'Tailwind CSS', 'Next.js', 'UI Design'],
        year: 2
      },
      {
        name: 'Sumaiya Khan',
        email: 'sumaiyaakhann07@gmail.com',
        role: 'Full Stack Engineer',
        github: 'https://github.com/sumaiyak12',
        linkedin: 'https://www.linkedin.com/in/sumaiya-khan-a9b017328',
        bio: 'Full-stack developer and tech lead',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'DevOps'],
        year: 3
      },
      {
        name: 'Abhishek Soni',
        email: 'iamabhi.as0001@gmail.com',
        role: 'Team Member',
        github: 'https://github.com/akaabhi2005',
        linkedin: 'https://www.linkedin.com/in/abhishek-soni-06725326b/',
        bio: 'Specialized in backend architecture and APIs',
        skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis'],
        year: 3
      },
      {
        name: 'Aditya Shukla',
        email: 'forgame0417@gmail.com',
        role: 'Hardware Engineer',
        github: 'https://github.com/aditya',
        linkedin: 'https://linkedin.com/in/aditya',
        bio: 'IoT and embedded systems specialist',
        skills: ['Arduino', 'IoT', 'Embedded C', 'Raspberry Pi', 'MQTT'],
        year: 2
      },
      {
        name: 'Ankit Yadav',
        email: 'adityayadav10533@gmail.com',
        role: 'AI/ML Developer',
        github: 'https://github.com/AnkitYadav10533',
        linkedin: 'https://www.linkedin.com/in/ankit-yadav-a83094306?utm_source=share_via&utm_content=profile&utm_medium=member_android',
        bio: 'Passionate AI/ML developer building intelligent applications using Machine Learning, NLP, LLMs, and Generative AI to solve real-world problems.',
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'Scikit-learn', 'NLP', 'LLMs', 'OpenCV', 'GenAI'],
        year: 2
      },


      {
        name: 'Harsh Chandra Mishra',
        email: 'hrshchndra762@gmail.com',
        role: 'DevOps Engineer',
        github: 'https://github.com/harsh',
        linkedin: 'https://linkedin.com/in/harsh',
        bio: 'Infrastructure and deployment specialist',
        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
        year: 3
      },
      {
        name: 'Swarnim Tiwari',
        email: 'swarnimtiwari2aug2006@gmail.com',
        role: 'Developer',
        github: 'https://github.com/swarnim',
        linkedin: 'https://linkedin.com/in/swarnim',
        bio: 'Passionate learner and developer',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Web Dev'],
        year: 1
      },
      {
        name: 'Samriddhi Tripathi',
        email: 'tripathisamriddhi20@gmail.com',
        role: 'UI/UX Designer',
        github: 'https://github.com/samyyy25',
        linkedin: 'https://www.linkedin.com/in/samriddhi-tripathi-b41029341',
        bio: 'Creative UI/UX designer passionate about crafting intuitive, user-centered digital experiences with a focus on clean interfaces, usability, and modern design principles.',
        skills: ['Figma', 'UI Design', 'UX Research', 'Wireframing', 'Prototyping', 'Adobe XD'],
        year: 2
      },
      {
        name: 'Abhay Shanker Tiwari',
        email: 'abhaylibra15@gmail.com',
        role: 'Backend Developer',
        github: 'https://github.com/mrgraciz123',
        linkedin: 'https://www.linkedin.com/in/abhay-shanker-tiwari-0a8031213/',
        bio: 'Passionate Backend Developer focused on building secure, scalable, and high-performance web applications using modern backend technologies and RESTful APIs.',
        skills: ['Python', 'Node.js', 'Express.js', 'REST API', 'MySQL', 'Git'],
        year: 3
      },
      {
        name: 'Aamina Hasan',
        email: 'aamina.h6420@gmail.com',
        role: 'Developer',
        github: 'https://github.com/aamina15',
        linkedin: 'https://www.linkedin.com/in/aamina-hasan-50a6a930b/',
        bio: 'Software developer focused on building modern web applications with clean, efficient code.',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Git'],
        year: 2
      },
      {
        name: 'Anjali Yadav',
        email: 'i42133915@gmail.com',
        role: 'Frontend',
        github: 'https://github.com/Anjaliy6126',
        linkedin: 'i42133915@gmail.com',
        bio: 'Passionate Frontend Developer focused on building modern, responsive, and user-friendly interfaces.',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Git'],
        year: 2
      }
    ];

    const createdTeam = await Team.insertMany(
      teamMembers.map(member => ({
        ...member,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.email}`,
        isActive: true
      }))
    );
    console.log(`✓ Created ${createdTeam.length} team members`);

    const projects = [
      {
        title: 'FittyFit',
        slug: 'fittyfit',
        description: 'A comprehensive fitness tracking and personalized workout recommendation platform using AI.',
        longDescription: 'FittyFit leverages machine learning to provide personalized fitness recommendations based on user metrics, goals, and preferences. Features include workout tracking, progress analytics, and AI-powered coaching.',
        category: 'Health',
        image: 'https://via.placeholder.com/600x400?text=FittyFit',
        github: 'https://github.com/vanshikacs/FittyFit',
        liveLink: 'https://fittyfit.app',
        techStack: ['React', 'Node.js', 'MongoDB', 'TensorFlow'],
        teamMembers: [createdTeam[2]._id, createdTeam[3]._id],
        featured: true,
        status: 'Completed'
      },
      {
        title: 'Ascend ID',
        slug: 'ascend-id',
        description: 'A blockchain-based digital identity verification system ensuring secure and tamper-proof credential management.',
        longDescription: 'Ascend ID provides a decentralized identity solution for educational institutions using blockchain technology.',
        category: 'Security',
        image: 'https://via.placeholder.com/600x400?text=Ascend+ID',
        github: 'https://github.com/mrgraciz123/Ascend_ID',
        liveLink: 'https://ascendid.app',
        techStack: ['Ethereum', 'React', 'Solidity', 'Web3.js'],
        teamMembers: [createdTeam[1]._id, createdTeam[0]._id],
        featured: false,
        status: 'Completed'
      },
      {
        title: 'GridMind AI 2.0',
        slug: 'gridmind-ai-2',
        description: 'An advanced AI-powered grid optimization engine predicting and balancing energy distribution across smart grids.',
        longDescription: 'GridMind AI uses deep learning models to optimize energy distribution in smart grids, reducing waste and improving efficiency.',
        category: 'AI',
        image: 'https://via.placeholder.com/600x400?text=GridMind+AI',
        github: 'https://github.com/mrgraciz123/gridmind-ai-2.0',
        liveLink: 'https://gridmind.ai',
        techStack: ['Python', 'TensorFlow', 'PyTorch', 'Node.js'],
        teamMembers: [createdTeam[1]._id],
        featured: true,
        status: 'Completed'
      },
      {
        title: 'ProofPass',
        slug: 'proofpass',
        description: 'A zero-knowledge proof authentication framework enabling secure, privacy-preserving user verification.',
        longDescription: 'ProofPass uses cryptographic zero-knowledge proofs to enable authentication without exposing sensitive credentials.',
        category: 'Security',
        image: 'https://via.placeholder.com/600x400?text=ProofPass',
        github: 'https://github.com/mrgraciz123/ProofPass-hackathon-MVP',
        liveLink: 'https://proofpass.app',
        techStack: ['Rust', 'JavaScript', 'Cryptography', 'Zero-Knowledge Proofs'],
        teamMembers: [createdTeam[0]._id],
        featured: false,
        status: 'Completed'
      },
      {
        title: 'BargainBaba',
        slug: 'bargainbaba',
        description: 'An intelligent e-commerce price comparison platform helping users find the best deals across retailers.',
        longDescription: 'BargainBaba aggregates prices from multiple online retailers, using AI to predict future prices and notify users of good deals.',
        category: 'Web',
        image: 'https://via.placeholder.com/600x400?text=BargainBaba',
        github: 'https://github.com/mrgraciz123/bargainbaba',
        liveLink: 'https://bargainbaba.com',
        techStack: ['Next.js', 'Node.js', 'MongoDB', 'Web Scraping'],
        teamMembers: [createdTeam[0]._id],
        featured: false,
        status: 'Completed'
      },
      {
        title: 'Chhatrachhaya',
        slug: 'chhatrachhaya',
        description: 'An inclusive education technology platform providing accessible learning resources for diverse learning needs.',
        longDescription: 'Chhatrachhaya makes quality education accessible to all students, including those with disabilities.',
        category: 'Education',
        image: 'https://via.placeholder.com/600x400?text=Chhatrachhaya',
        github: 'https://github.com/mrgraciz123/chhatrachhayaa',
        liveLink: 'https://chhatrachhaya.edu',
        techStack: ['React', 'Node.js', 'MongoDB', 'Accessibility APIs'],
        teamMembers: [createdTeam[1]._id, createdTeam[4]._id],
        featured: true,
        status: 'Completed'
      },
      {
        title: 'VaniCode',
        slug: 'vanicode',
        description: 'A developer-first API documentation and code collaboration tool streamlining technical specification sharing.',
        longDescription: 'VaniCode provides an intuitive platform for developers to document, share, and collaborate on APIs.',
        category: 'Web',
        image: 'https://via.placeholder.com/600x400?text=VaniCode',
        github: 'https://github.com/mrgraciz123/vanicode',
        liveLink: 'https://vanicode.dev',
        techStack: ['React', 'Express', 'PostgreSQL', 'Docker'],
        teamMembers: [createdTeam[1]._id, createdTeam[0]._id],
        featured: false,
        status: 'Completed'
      },
      {
        title: 'FinCoach',
        slug: 'fincoach',
        description: 'An AI-driven personal finance advisor providing real-time investment insights and financial planning.',
        longDescription: 'FinCoach uses machine learning to provide personalized financial advice including investment recommendations.',
        category: 'Finance',
        image: 'https://via.placeholder.com/600x400?text=FinCoach',
        github: 'https://github.com/mrgraciz123/FinCoach',
        liveLink: 'https://fincoach.ai',
        techStack: ['Python', 'TensorFlow', 'React', 'Financial APIs'],
        teamMembers: [createdTeam[6]._id],
        featured: true,
        status: 'Completed'
      }
    ];

    const createdProjects = await Project.insertMany(projects);
    console.log(`✓ Created ${createdProjects.length} projects`);

    console.log('\n✅ Database seeding completed!');
    console.log('\n📝 Admin Login:');
    console.log('   Email: admin@alchemii.com');
    console.log('   Password: Admin@123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();