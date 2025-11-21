export type LinkCategory = {
  id: string
  label: string
  items: { id: string; label: string }[]
}

export const linkCategories: LinkCategory[] = [
  {
    id: "favorites",
    label: "お気に入り",
    items: [
      { id: "favorite-1", label: "サンプル1" },
      { id: "favorite-2", label: "サンプル2" },
    ],
  },
  {
    id: "hr",
    label: "人事・給与",
    items: [],
  },
  {
    id: "others",
    label: "その他",
    items: [],
  },
  {
    id: "todo",
    label: "ToDo",
    items: [
      { id: "todo-1", label: "サンプル1" },
      { id: "todo-2", label: "サンプル2" },
    ],
  },
]
