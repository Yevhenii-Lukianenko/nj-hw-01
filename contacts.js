const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    return contacts;
  } catch {
    return null;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.filter((contact) => contact.id === contactId);
    const contactById = contact.length > 0 ? contact : null;
    return contactById;
  } catch {
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contactById = await getContactById(contactId);

    if (contactById === null) {
      return null;
    }

    const contacts = await listContacts();
    const updetedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(updetedContacts));
    return contactById;
  } catch {
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = [
      {
        id: uuidv4(),
        name,
        email,
        phone,
      },
    ];
    contacts.push(...newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch {
    return null;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
