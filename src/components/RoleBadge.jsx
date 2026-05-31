export default function RoleBadge({ role }) {
  const normalizedRole = role.replaceAll(" ", "-").toLowerCase();
  return <span className={`role-badge ${normalizedRole}`}>{role}</span>;
}

