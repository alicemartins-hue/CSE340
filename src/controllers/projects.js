import { getAllProjects } from '../models/projects.js';
import {
    getUpcomingProjects,
    getProjectDetails
} from "../models/projects.js";


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

export { showProjectsPage };