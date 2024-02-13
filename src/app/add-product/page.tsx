import prismaw from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma"
import FormSubmitButton from "@/components/FormSubmitButton";
export const metadata = {
    title: 'Add product page - Flowmazon',
    description: 'zzz'
}
// ? server function
async function addProduct(formData: FormData) {
    // ? we tell nextjs that this function is server side or else it doesnt work
    "use server";
    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const imageUrl = formData.get('imageUrl')?.toString();
    const price = Number(formData.get('price') || 0);

    if (!name || !description || !imageUrl || !price)
        throw Error("Missing values");
    await prisma?.product.create({
        data: { name, description, imageUrl, price }
    });

    redirect("/");
}

function AddProductPage() {
    return (<div>
        <h1 className="text-lg mb-3 font-bold">Add product</h1>
        <form action={addProduct}>
            <input
                required
                name="name"
                placeholder="name"
                className="input input-bordered mb-3 w-full"
            />
            <textarea
                required
                name="description"
                placeholder="description"
                className="textarea textarea-bordered mb-3 w-full"
            />
            <input
                required
                name="imageUrl"
                placeholder="Image URL"
                className="input input-bordered mb-3 w-full"
                type="url"
            />
            <input
                required
                name="price"
                placeholder="Price"
                className="input input-bordered mb-3 w-full"
                type="number"
            />
            <FormSubmitButton
                className="btn-block"

            >
                Add product
            </FormSubmitButton>
        </form>
    </div>);
}

export default AddProductPage;
