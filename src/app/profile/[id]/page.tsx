export default async function UserProfile({params}: {params: {id: string}}) {
    const { id } = await params;
    return (
        <div>
            <h1>User Profile</h1>
            {/* Add user profile details here */}
            <p className="text-2xl">User ID: {id}</p>
            {/* You can fetch and display user data based on the ID */}
        </div>
    );
}
