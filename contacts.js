const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

const data = async () => {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result) ?? null;
}

const dataWrite = async (result) => {
  return await fs.writeFile(contactsPath, JSON.stringify(result));
}

const listContacts = async () => {
    console.table(await data());
} 


const getContactById = async (contactId) => {
    const result = (await data())?.find(({ id }) => id === contactId.toString());
    console.table(result);
}
const removeContact = async(contactId) => {
    const result = (await data())?.filter(({ id }) => id !== contactId.toString());
    await dataWrite(result);
    console.table(await data());
}

const addContact = async (name, email, phone) => {
    const contactNew = {
        name,
        email,
        phone,
        id: ((await data())?.length + 1).toString()
    };

    await dataWrite([...(await data()), contactNew]);
    console.table(await data());
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}