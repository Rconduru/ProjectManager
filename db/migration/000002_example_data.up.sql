insert into users (username, password) values ('admin', 'fab0cc3d-b3ce-5778-a835-cd18783c9f8b');

insert into projects (title, description, started_at) values ('Projeto XPTO', 'Projeto de carga do xpto no sistem', now());
insert into projects (title, description, started_at) values ('Projeto Teste', 'Projeto de teste carregado automáticamente', now());

insert into tasks (project_id, title, description, is_finished) values (1, 'Desenvolver tela de login', 'Tela de login feita em react', false);
insert into tasks (project_id, title, description, is_finished) values (1, 'Desenvolver tela de apresentação', 'Tela de login feita em react', false);
insert into tasks (project_id, title, description, is_finished) values (2, 'Desenvolver tela de apresentação', 'Tela de login feita em react', false);

insert into collaborators ("name", "position") values ('Pedro Alberto', 'developer');
insert into collaborators ("name", "position") values ('Gabriel Bispo', 'developer');
insert into collaborators ("name", "position") values ('João Vieira', 'designer');
