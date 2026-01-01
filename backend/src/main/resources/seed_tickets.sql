-- Limpiar datos existentes
TRUNCATE TABLE historial_tickets, respuestas, archivos, tickets, categorias, departamentos, prioridades, usuarios CASCADE;

-- Crear Admin
INSERT INTO usuarios (id, nombre_completo, email, password, rol, activo, fecha_creacion, fecha_actualizacion, departamento_id)
VALUES (
    '8dc05f76-01dc-40de-ae24-886b1541c5c5', 
    'Administrador del Sistema', 
    'admin@cooperativa.com.py', 
    '$2b$12$EIk3BKlC00Zsz7TLIcE8wuW96V/CowJ/P9Wjoav.rkvG7hKYuQKfO', 
    'SUPER_ADMIN', 
    true, 
    NOW(), 
    NOW(),
    NULL
);

-- Departamentos (Solo fecha_creacion)
INSERT INTO departamentos (id, nombre, descripcion, email_notificacion, color, icono, orden, activo, fecha_creacion) VALUES
('4e951d1d-ab73-4336-a51e-5b4fdee1ede7', 'Tecnología', 'Departamento de sistemas e infraestructura', 'tecnologia@cooperativa.com.py', '#3B82F6', 'laptop', 1, true, NOW()),
('5fc05a76-9d32-47f2-9f3b-8914563a6332', 'Contabilidad', 'Departamento de contabilidad y finanzas', 'contabilidad@cooperativa.com.py', '#10B981', 'calculator', 2, true, NOW()),
('a8e93276-8f21-4a3b-9e4c-123456789012', 'Servicio al Cliente', 'Atención al socio', 'atencion@cooperativa.com.py', '#F59E0B', 'users', 3, true, NOW());

-- Categorías (Sin fechas)
INSERT INTO categorias (id, nombre, descripcion, icono, color, orden, activo, departamento_id) VALUES
('692684bb-121c-4646-ac61-b5a0ccd36e4b', 'Error de Sistema', 'Errores técnicos y bugs', 'bug', '#EF4444', 1, true, '4e951d1d-ab73-4336-a51e-5b4fdee1ede7'),
('5b4a0ec6-dcd9-43e1-a7bd-b7cca02fc682', 'Consulta', 'Consultas generales', 'help-circle', '#3B82F6', 2, true, 'a8e93276-8f21-4a3b-9e4c-123456789012'),
('1b720ac6-8100-4f20-af69-0c9e16ebc434', 'Solicitud de Equipo', 'Pedidos de hardware', 'monitor', '#10B981', 3, true, '4e951d1d-ab73-4336-a51e-5b4fdee1ede7');

-- Prioridades
INSERT INTO prioridades (id, nombre, nivel, color_hex, tiempo_respuesta_horas, activo) VALUES
('60248c46-dcba-4ff5-9da7-22e0733dd72e', 'Baja', 1, '#64748B', 72, true),
('3b794a85-8d88-482a-9fce-ffe73d7119a4', 'Normal', 2, '#3B82F6', 24, true),
('4223435b-8fc9-4497-a229-c744ea99477f', 'Alta', 3, '#F59E0B', 8, true),
('8c921345-a1b2-4c3d-e5f6-789012345678', 'Urgente', 4, '#EF4444', 2, true)
ON CONFLICT DO NOTHING;

-- Estados
INSERT INTO estados (id, nombre, tipo, color_hex, orden, activo) VALUES
(gen_random_uuid(), 'Abierto', 'ABIERTO', '#10B981', 1, true),
(gen_random_uuid(), 'En Proceso', 'EN_PROCESO', '#F59E0B', 2, true),
(gen_random_uuid(), 'Resuelto', 'CERRADO', '#6366F1', 3, true),
(gen_random_uuid(), 'Cerrado', 'CERRADO', '#64748B', 4, true)
ON CONFLICT DO NOTHING;

-- Tickets
DO $$
DECLARE
    v_admin_id uuid := '8dc05f76-01dc-40de-ae24-886b1541c5c5';
    v_estado_abierto_id uuid;
    v_ticket_id uuid;
BEGIN
    SELECT id INTO v_estado_abierto_id FROM estados WHERE nombre='Abierto';

    -- Ticket 1
    v_ticket_id := gen_random_uuid();
    INSERT INTO tickets (id, numero, asunto, descripcion, solicitante_id, departamento_id, categoria_id, prioridad_id, estado_id, fecha_creacion, fecha_actualizacion, sla_pausado)
    VALUES (
        v_ticket_id, 
        'SGTI-2025-00001', 
        'Error al ingresar al homebanking', 
        'El usuario reporta error 500 al intentar loguearse.', 
        v_admin_id, 
        '4e951d1d-ab73-4336-a51e-5b4fdee1ede7', 
        '692684bb-121c-4646-ac61-b5a0ccd36e4b', 
        '4223435b-8fc9-4497-a229-c744ea99477f', 
        v_estado_abierto_id, 
        NOW(), NOW(), false
    );
    
    INSERT INTO historial_tickets (id, ticket_id, tipo_accion, comentario, usuario_id, timestamp)
    VALUES (gen_random_uuid(), v_ticket_id, 'CREACION', 'Ticket creado', v_admin_id, NOW());
END $$;
