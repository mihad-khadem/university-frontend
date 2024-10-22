import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types/sidebar.types";

export const sidebarItemsGenerator = (
  items: TUserPath[],
  role: string
): TSidebarItem[] => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item: TUserPath) => {
    // Check if item has path and element
    if (item.path && item.element) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children
          ? sidebarItemsGenerator(item.children, role)
          : [], // Recursively generate children
      });
    }

    // If the item has children, map over them and create the NavLink
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }

    return acc; // Make sure to return the accumulator
  }, []); // Initialize accumulator as an empty array

  return sidebarItems; // Return the generated sidebar items
};
