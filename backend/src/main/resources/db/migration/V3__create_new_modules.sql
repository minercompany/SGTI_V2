CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_to_id UUID REFERENCES users(id),
    due_date TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS socios (
    id UUID PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255),
    telefono VARCHAR(50),
    direccion TEXT,
    estado VARCHAR(50) DEFAULT 'Activo',
    ahorros DECIMAL(15, 2) DEFAULT 0,
    creditos_activos INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS knowledge_base (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(100),
    type VARCHAR(50),
    views INT DEFAULT 0,
    author_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data for testing
INSERT INTO socios (id, nombre, cedula, estado, ahorros, creditos_activos) VALUES
(gen_random_uuid(), 'Juan Carlos Pérez', '1.234.567', 'Activo', 25500000, 2),
(gen_random_uuid(), 'María Eugenia González', '2.345.678', 'Activo', 15300000, 1),
(gen_random_uuid(), 'Roberto Martínez', '3.456.789', 'Inactivo', 5200000, 0),
(gen_random_uuid(), 'Ana Laura Benítez', '4.567.890', 'Activo', 42800000, 3)
ON CONFLICT (cedula) DO NOTHING;
