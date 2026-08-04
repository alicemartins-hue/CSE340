import {
    getAllProjects,
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject
} from "../models/projects.js";
import { getCategoriesByProjectId } from "../models/categories.js";
import { getAllOrganizations } from "../models/organizations.js";
import { body, validationResult } from "express-validator";

const projectValidation = [
    body("title")
        .trim()
        .notEmpty().withMessage("Project title is required.")
        .isLength({ min: 3, max: 200 }).withMessage("Project title must be between 3 and 200 characters."),

    body("description")
        .trim()
        .notEmpty().withMessage("Description is required.")
        .isLength({ max: 1000 }).withMessage("Description must be less than 1000 characters."),

    body("location")
        .trim()
        .notEmpty().withMessage("Location is required.")
        .isLength({ max: 200 }).withMessage("Location must be less than 200 characters."),

    body("date")
        .notEmpty().withMessage("Project date is required.")
        .isISO8601().withMessage("Please enter a valid date."),

    body("organizationId")
        .notEmpty().withMessage("Organization is required.")
        .isInt().withMessage("Please select a valid organization.")
];

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

const showEditProjectForm = async (req, res) => {

    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    const organizations = await getAllOrganizations();

    const title = "Edit Service Project";

    res.render("update-project", {
        title,
        project,
        organizations
    });
};

const processEditProjectForm = async (req, res) => {

    const projectId = req.params.id;

    const {
        title,
        description,
        location,
        date,
        organizationId
    } = req.body;


    try {

        await updateProject(
            projectId,
            title,
            description,
            location,
            date,
            organizationId
        );


        req.flash(
            "success",
            "Project updated successfully!"
        );


        res.redirect(`/project/${projectId}`);


    } catch (error) {

        console.error("Error updating project:", error);

        req.flash(
            "error",
            "There was an error updating the project."
        );

        res.redirect(`/edit-project/${projectId}`);
    }
};

const processNewProjectForm = async (req, res) => {
    const { title, description, location, date, organizationId } = req.body;
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach(error => {
            req.flash("error", error.msg);
        });

        return res.redirect("/new-project");
    }

    try {

        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } /**catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }**/
    catch (error) {
        console.error("========== ERROR ==========");
        console.error(error);
        console.error(error.message);

        req.flash("error", error.message);

        return res.redirect("/new-project");
    }
}

export { showProjectsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm };