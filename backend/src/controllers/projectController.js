import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/projects.json');
const TEAM_DATA_FILE = path.join(__dirname, '../data/teamMembers.json');

const readProjects = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects.json:', error);
    return [];
  }
};

const writeProjects = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing projects.json:', error);
    return false;
  }
};

const readTeamMembers = () => {
  try {
    const data = fs.readFileSync(TEAM_DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const populateProjectTeamMembers = (project, teamMembersList) => {
  const populatedMembers = (project.teamMembers || []).map(memberId => {
    return teamMembersList.find(m => m._id === memberId) || memberId;
  });
  return {
    ...project,
    teamMembers: populatedMembers
  };
};

export const getAllProjects = async (req, res, next) => {
  try {
    const { category, featured, search, page = 1, limit = 10 } = req.query;
    let projects = readProjects();
    const teamMembersList = readTeamMembers();

    // Filter by category
    if (category) {
      projects = projects.filter(project => project.category === category);
    }

    // Filter by featured
    if (featured === 'true') {
      projects = projects.filter(project => project.featured === true);
    }

    // Filter by search query (case-insensitive match on title and description)
    if (search) {
      const searchLower = search.toLowerCase();
      projects = projects.filter(project => {
        const titleMatch = project.title?.toLowerCase().includes(searchLower);
        const descriptionMatch = project.description?.toLowerCase().includes(searchLower);
        return titleMatch || descriptionMatch;
      });
    }

    // Sort by createdAt descending
    projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Populate team members
    projects = projects.map(p => populateProjectTeamMembers(p, teamMembersList));

    // Pagination
    const total = projects.length;
    const limitInt = parseInt(limit);
    const pageInt = parseInt(page);
    const skip = (pageInt - 1) * limitInt;
    const paginatedProjects = projects.slice(skip, skip + limitInt);

    res.json({
      success: true,
      data: paginatedProjects,
      pagination: {
        total,
        pages: Math.ceil(total / limitInt),
        page: pageInt,
        limit: limitInt
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const projects = readProjects();
    const project = projects.find(p => p._id === req.params.id || p.slug === req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    const teamMembersList = readTeamMembers();
    const populatedProject = populateProjectTeamMembers(project, teamMembersList);
    res.json({ success: true, data: populatedProject });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { title, slug, description, longDescription, category, image, github, liveLink, techStack, teamMembers, featured } = req.body;
    const projects = readProjects();

    const existingProject = projects.find(p => p.slug === slug);
    if (existingProject) {
      return res.status(400).json({ success: false, error: 'Project slug already exists' });
    }

    const newProject = {
      _id: new Date().getTime().toString(),
      title,
      slug,
      description,
      longDescription: longDescription || '',
      category,
      image: image || null,
      github: github || null,
      liveLink: liveLink || null,
      techStack: Array.isArray(techStack) ? techStack : [],
      teamMembers: Array.isArray(teamMembers) ? teamMembers : [],
      featured: featured === true || featured === 'true',
      status: 'In Progress',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    projects.push(newProject);
    writeProjects(projects);

    res.status(201).json({ success: true, message: 'Project created', data: newProject });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const projects = readProjects();
    const index = projects.findIndex(p => p._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const updatedProject = {
      ...projects[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    projects[index] = updatedProject;
    writeProjects(projects);

    const teamMembersList = readTeamMembers();
    const populated = populateProjectTeamMembers(updatedProject, teamMembersList);

    res.json({ success: true, message: 'Project updated', data: populated });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const projects = readProjects();
    const index = projects.findIndex(p => p._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    projects.splice(index, 1);
    writeProjects(projects);

    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};

export const getProjectStats = async (req, res, next) => {
  try {
    const projects = readProjects();

    const categoryMap = {};
    projects.forEach(p => {
      categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
    });

    const byCategory = Object.keys(categoryMap).map(cat => ({
      _id: cat,
      count: categoryMap[cat]
    }));

    const stats = {
      total: projects.length,
      byCategory,
      featured: projects.filter(p => p.featured === true).length
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};