import {
    getAllProjects,
    getUpcomingProjects,
    getProjectDetails,
    createProject
} from "../models/projects.js";
import { getCategoriesByProjectId } from "../models/categories.js";
import { getAllOrganizations } from "../models/organizations.js";



const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Service Projects';

    res.render("projects", {
        title: "Upcoming Service Projects",
        projects
    });
};

export async function showProjectDetailsPage(req, res) {

    const id = req.params.id;

    const project = await getProjectDetails(id);
    const categories = await getCategoriesByProjectId(id);
    
    res.render("project", {
        title: project.title,
        project,
        categories
    });

}


const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
}

const processNewProjectForm = async (req, res) => {
    const { title, description, location, date, organizationId } = req.body;

    try {

        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
}

export { showProjectsPage, showNewProjectForm, processNewProjectForm };