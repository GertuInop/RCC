async function createTables(pool) { 
    try {
        const createTypeOfEmploymentTable = `
            CREATE TABLE IF NOT EXISTS types_of_employment (
                id SERIAL UNIQUE NOT NULL,
                type_name VARCHAR(100) PRIMARY KEY,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createTypeOfEmploymentTable);
        console.log('TypeOfEmployment table created');

        const createTypeOfEducationTable = `
            CREATE TABLE IF NOT EXISTS types_of_education (
                id SERIAL UNIQUE NOT NULL,
                type_name VARCHAR(100) PRIMARY KEY,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createTypeOfEducationTable);
        console.log('TypeOfEducation table created');

        const createRolesTable = `
            CREATE TABLE IF NOT EXISTS roles (
                id SERIAL UNIQUE NOT NULL,
                role_name VARCHAR(100) PRIMARY KEY,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createRolesTable);
        console.log('Roles table created');

        const createUsersTable = `    
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                surname VARCHAR(100) NOT NULL,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone BIGINT NOT NULL,
                password TEXT,
                birth_date DATE NOT NULL,
                address VARCHAR(255),
                type_of_employment VARCHAR(100) REFERENCES types_of_employment(type_name) ON DELETE CASCADE,
                type_of_education VARCHAR(100) REFERENCES types_of_education(type_name) ON DELETE CASCADE,
                role VARCHAR(100) REFERENCES roles(role_name) ON DELETE CASCADE DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createUsersTable);
        console.log('Users table creared');

        const createEventTable =`
            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) UNIQUE NOT NULL,
                description VARCHAR(255) UNIQUE NOT NULL,
                address VARCHAR(255) NOT NULL,
                date DATE NOT NULL,
                time TIME NOT NULL,
                img_link TEXT,
                creater_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createEventTable);
        console.log('Events table created');
        
        const createEventRegistrationsTable =`
            CREATE TABLE IF NOT EXISTS event_registrations (
                id SERIAL PRIMARY KEY,
                event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
                event_title VARCHAR(255) REFERENCES events(title) ON DELETE CASCADE,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createEventRegistrationsTable);
        console.log('Event registrations table created');

        const createNotificationsTable =`
            CREATE TABLE IF NOT EXISTS notifications (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                text TEXT NOT NULL,
                is_seen BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createNotificationsTable);
        console.log('Notifications table created');

        const createSessionTable = `
        CREATE TABLE IF NOT EXISTS session (
            "sid" VARCHAR NOT NULL COLLATE "default",
            "sess" JSON NOT NULL,
            "expire" TIMESTAMP(6) NOT NULL
        )
        WITH (OIDS=FALSE);

        ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");
        `;
        await pool.query(createSessionTable);
        console.log('Session table created');
    } catch (error) {
        console.log('Error creating tables: ', error.message);
    }
}

module.exports = createTables;