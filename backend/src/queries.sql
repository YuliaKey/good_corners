CREATE TABLE ad (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
	title TEXT NOT NULL,
	description TEXT,
	owner TEXT NOT NULL,
	price INTEGER,
  picture TEXT,
  location TEXT,
	createdAt TEXT
);

INSERT INTO ad  (title, description, owner, price, picture, location, createdAt, category_id) VALUES 
('Appareil photo Nikon', 'Appareil photo reflex numérique avec objectif', 'Eva', 600, 'https://example.com/camera.jpg', 'Nice', '2023-08-11', 2), ('Livre de cuisine', 'Livre de recettes de cuisine française', 'Fiona', 20, 'https://example.com/cookbook.jpg', 'Lille', '2023-06-11', 1),
('Ordinateur portable Dell', 'rdinateur portable Dell XPS 13', 'Pedro', 1200, 'https://example.com/cookbook.jpg', 'Lille', '2023-07-23', 2),
('Tableau abstrait', 'Tableau d art abstrait, peint à la main', 'Morgane', 150, 'https://example.com/painting.jpg', 'Nantes', '2023-09-11', 3),
('Chaussures de course Nike', 'Chaussures de course pour hommes, pointure 42', 'Lenny', 80, 'https://example.com/cookbook.jpg', 'Bordeaux', '2023-07-01', 4),
('Vélo pour enfants', 'Vélo pour enfants, 16 pouces, avec stabilisateurs', 'Jack', 50, 'https://example.com/kids-bike.jpg', 'Strasbourg', '2023-08-31', 6);

-- SELECT description from ad;

-- SELECT description from ad WHERE location = 'Bordeaux';

-- DELETE FROM ad WHERE price < 80;

-- UPDATE ad SET price = 0 WHERE createdAt='2023-09-11';

-- SELECT AVG(price) FROM ad WHERE location LIKE 'Paris';

-- SELECT location, AVG(price) AS moyenne_prix
-- FROM ad
-- GROUP BY location;

-- SELECT ad.id, ad.title, ad.description, ad.owner, ad.price, ad.picture, ad.location, category.name AS category_name
-- FROM ad
-- INNER JOIN category ON ad.category_id = category.id;