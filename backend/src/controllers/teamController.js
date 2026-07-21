import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/teamMembers.json');

const readTeamMembers = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading teamMembers.json:', error);
    return [];
  }
};

const writeTeamMembers = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing teamMembers.json:', error);
    return false;
  }
};

export const getAllTeamMembers = async (req, res, next) => {
  try {
    const { search, role, page = 1, limit = 10 } = req.query;
    let members = readTeamMembers();

    // Filter by isActive
    members = members.filter(member => member.isActive !== false);

    // Filter by search query (case-insensitive match on name, role, and skills)
    if (search) {
      const searchLower = search.toLowerCase();
      members = members.filter(member => {
        const nameMatch = member.name?.toLowerCase().includes(searchLower);
        const roleMatch = member.role?.toLowerCase().includes(searchLower);
        const skillsMatch = member.skills?.some(skill => skill.toLowerCase().includes(searchLower));
        return nameMatch || roleMatch || skillsMatch;
      });
    }

    // Filter by role
    if (role) {
      members = members.filter(member => member.role === role);
    }

    // Sort by createdAt descending
    members.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const total = members.length;
    const limitInt = parseInt(limit);
    const pageInt = parseInt(page);
    const skip = (pageInt - 1) * limitInt;
    const paginatedMembers = members.slice(skip, skip + limitInt);

    res.json({
      success: true,
      data: paginatedMembers,
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

export const getTeamMember = async (req, res, next) => {
  try {
    const members = readTeamMembers();
    const member = members.find(m => m._id === req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, error: 'Team member not found' });
    }
    res.json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

export const createTeamMember = async (req, res, next) => {
  try {
    const { name, email, role, bio, skills, year, github, linkedin, photo } = req.body;
    const members = readTeamMembers();

    const existingMember = members.find(m => m.email === email);
    if (existingMember) {
      return res.status(400).json({ success: false, error: 'Email already exists' });
    }

    const newMember = {
      _id: new Date().getTime().toString(),
      name,
      email,
      role,
      bio,
      skills: Array.isArray(skills) ? skills : [],
      year: parseInt(year) || 1,
      github: github || null,
      linkedin: linkedin || null,
      photo: photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    members.push(newMember);
    writeTeamMembers(members);

    res.status(201).json({ success: true, message: 'Team member added', data: newMember });
  } catch (error) {
    next(error);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    const members = readTeamMembers();
    const index = members.findIndex(m => m._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Team member not found' });
    }

    const updatedMember = {
      ...members[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    members[index] = updatedMember;
    writeTeamMembers(members);

    res.json({ success: true, message: 'Team member updated', data: updatedMember });
  } catch (error) {
    next(error);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  try {
    const members = readTeamMembers();
    const index = members.findIndex(m => m._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Team member not found' });
    }

    members[index].isActive = false;
    members[index].updatedAt = new Date().toISOString();
    writeTeamMembers(members);

    res.json({ success: true, message: 'Team member removed' });
  } catch (error) {
    next(error);
  }
};

export const getTeamStats = async (req, res, next) => {
  try {
    const members = readTeamMembers().filter(m => m.isActive !== false);

    // Calculate stats by role
    const roleMap = {};
    members.forEach(m => {
      roleMap[m.role] = (roleMap[m.role] || 0) + 1;
    });
    const byRole = Object.keys(roleMap).map(role => ({
      _id: role,
      count: roleMap[role]
    }));

    // Calculate stats by year
    const yearMap = {};
    members.forEach(m => {
      yearMap[m.year] = (yearMap[m.year] || 0) + 1;
    });
    const byYear = Object.keys(yearMap).map(year => ({
      _id: parseInt(year),
      count: yearMap[year]
    }));

    const stats = {
      total: members.length,
      byRole,
      byYear
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};