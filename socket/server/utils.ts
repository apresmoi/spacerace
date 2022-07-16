export function getPageRoom(id: string) {
  return `page-${id}`;
}

export function getPageListRoom(parentId?: string | null) {
  return parentId ? `pagelist` : `pagelist-${parentId}}`;
}
