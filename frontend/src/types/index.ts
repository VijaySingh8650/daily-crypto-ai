export type TypeOfFormData = {
    name?: string;
    email: string;
    password: string;
}

export type TypeOfBook = {
    author: string;
    genre: string;
    title: string;
    description: string;
    _id?: string;
}

export type TypeOfGenreBooks = {
    label: string;
    value: string;
}