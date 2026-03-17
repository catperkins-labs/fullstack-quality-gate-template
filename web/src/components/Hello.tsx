interface HelloProps {
  name: string
}

export default function Hello({ name }: HelloProps) {
  return <p>Hello, {name}!</p>
}
