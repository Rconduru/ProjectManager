# Tarefas

## Backend

### Requisitos:
    1. Backend:
        ✅ Desenvolva um backend utilizando uma framework JavaScript NodeJs.
    2. Projetos e Tarefas:
        ✅ Cada projeto deve ter um título, uma descrição e uma data de início.
        ✅ As tarefas devem ter um título, uma descrição, uma data de criação, uma data de conclusão estimada e um
        estado de conclusão.
        ✅ Um projeto pode ter várias tarefas e subprojetos.
    3. Alocação de Recursos:
        Implemente um sistema de alocação de recursos para tarefas. Cada tarefa pode ter recursos associados (por
        exemplo, desenvolvedores, designers) e uma estimativa de horas necessárias para a conclusão.
        Garanta que um recurso não seja alocado para mais de uma tarefa simultaneamente.
    4. Relatórios:
        Crie um endpoint para gerar relatórios sobre a carga de trabalho dos recursos. O relatório deve mostrar a
        quantidade de horas alocadas para cada recurso em um determinado período de tempo.
    5. Autenticação e Autorização:
        Implemente um sistema básico de autenticação para garantir que apenas usuários autenticados possam criar,
        editar ou excluir projetos e tarefas.
        Adicione autorização para garantir que um usuário só possa modificar projetos e tarefas que ele próprio criou.
    6. Validações Avançadas:
        Além das validações básicas, implemente validações mais avançadas, como garantir que a data de conclusão
        estimada de uma tarefa seja posterior à sua data de criação.
    7. Escalabilidade:
        Projete a aplicação de forma a lidar com um grande número de projetos, tarefas e recursos sem perder
        desempenho.

### Technical features
#### Backend
[ ] - Log de servidor (alto nível, não é console log a torta e a direita);
[ ] - Sistema de Validação de entrada de requisição;
[ ] - Sistema de Autorização por Roles Role-Based Access Control (RBAC);


### Atividades
[X] - Implementar o serviço de subproject;
[X] - Implementar Express Validator (Zoi);
[X] - Implementar validação no SaveProject, SaveSubProject;
[ ] - Testar Criações de projeto e subprojeto
[ ] - Bolar tela de detalhes do projeto;
[X] - Implmentar Role
