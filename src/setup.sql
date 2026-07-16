CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL
);

INSERT INTO project (organization_id, title, description, location, project_date)
VALUES
-- BrightFuture Builders (organization_id = 1)
(1, 'Community Playground Renovation',
 'Renovate an aging playground with safer and more accessible equipment.',
 'Maple City Park',
 '2026-08-15'),

(1, 'Neighborhood Sidewalk Repair',
 'Repair damaged sidewalks to improve pedestrian safety.',
 'Downtown District',
 '2026-09-10'),

(1, 'Public Library Expansion',
 'Assist with expanding the local library to create additional study spaces.',
 'Central Library',
 '2026-10-05'),

(1, 'Community Center Painting',
 'Paint and refresh the interior and exterior of the community center.',
 'Westside Community Center',
 '2026-08-28'),

(1, 'Bus Stop Shelter Construction',
 'Build new weather-resistant shelters for public transportation users.',
 'Oak Avenue',
 '2026-11-12'),

-- GreenHarvest Growers (organization_id = 2)
(2, 'Urban Garden Planting',
 'Plant vegetables and herbs in a new community garden.',
 'Green Park',
 '2026-08-20'),

(2, 'Composting Workshop',
 'Teach residents how to create and maintain compost systems.',
 'Community Garden',
 '2026-09-03'),

(2, 'Tree Planting Day',
 'Plant native trees to improve the local environment.',
 'Riverfront Park',
 '2026-10-18'),

(2, 'School Garden Maintenance',
 'Maintain and expand a vegetable garden at the local elementary school.',
 'Lincoln Elementary School',
 '2026-09-24'),

(2, 'Farmers Market Volunteer Day',
 'Support local farmers by organizing and managing community market activities.',
 'City Farmers Market',
 '2026-11-07'),

-- UnityServe Volunteers (organization_id = 3)
(3, 'Food Bank Distribution',
 'Sort and distribute donated food to families in need.',
 'Community Food Bank',
 '2026-08-09'),

(3, 'Senior Center Assistance',
 'Provide companionship and organize recreational activities for seniors.',
 'Sunrise Senior Center',
 '2026-09-17'),

(3, 'Charity Clothing Drive',
 'Collect, organize, and distribute donated clothing.',
 'UnityServe Headquarters',
 '2026-10-11'),

(3, 'Neighborhood Cleanup',
 'Remove litter and beautify public spaces with volunteers.',
 'Eastside Neighborhood',
 '2026-10-30'),

(3, 'Holiday Gift Wrapping Event',
 'Wrap donated gifts for families during the holiday season.',
 'Community Hall',
 '2026-12-05');

 SELECT * FROM project;

 SELECT
    p.project_id,
    p.title,
    p.description,
    p.location,
    p.project_date,
    o.name AS organization_name
FROM project p
JOIN organization o
ON p.organization_id = o.organization_id;

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_category (
    project_id INTEGER NOT NULL REFERENCES project(project_id),
    category_id INTEGER NOT NULL REFERENCES category(category_id),
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO category (name)
VALUES
('Education'),
('Environment'),
('Community Service');

INSERT INTO project_category (project_id, category_id)
VALUES
-- Education
(3, 1),
(7, 1),
(9, 1),

-- Environment
(6, 2),
(8, 2),
(14, 2),

-- Community Service
(1, 3),
(2, 3),
(4, 3),
(5, 3),
(10, 3),
(11, 3),
(12, 3),
(13, 3),
(15, 3);