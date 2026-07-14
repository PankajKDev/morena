type PageProps = {
  params: {
    username: string;
    pageurl: string;
  };
};
export default async function page({ params }: PageProps) {
  const { username, pageurl } = await params;
}
