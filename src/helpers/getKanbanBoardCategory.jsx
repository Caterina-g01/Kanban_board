export function getKanbanBoardCategory() {
  return [
    { key: "backlog", title: "Backlog", id: "backlog" },
    {
      key: "inProgress",
      title: "In Progress",
      id: "inProgress",
    },
    {
      key: "review",
      title: "Review",
      id: "review",
    },
    {
      key: "finished",
      title: "Finished",
      id: "finished",
    },
  ];
}
