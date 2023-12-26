import bcrypt from 'bcrypt';
export async function passwordMatcher(password: string, hashedPassword: string) {
    const matched = await bcrypt.compare(password, hashedPassword);

    return matched;
}