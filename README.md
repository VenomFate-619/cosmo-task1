
**

## Task

 - [x] Create such component
 - [x] It should be able to render this interface if given in some data
       form.
 - [x] User should be able to edit name of a field
 - [x] User should be able to add more fields
 - [x] User should be able to delete a field
 - [x] Users should be able to add nested fields to object type.
 - [x] There should be a save button which console the updated data.(trying to display as javascript object , little bit diffcult , if fails i will display the state directly)




# Nested object

![image](https://user-images.githubusercontent.com/67755128/233032984-04a4b1ce-3e40-4239-9ee3-74916dd8145e.png)

# Data schema

    [key:  string]: {
    
    type:  typesOfData;
    
    required:  boolean;
    
    name:  string;
    
    childIds:  string[];
    
    parentId:  string;
    
    };
  
# Example
    {
      1681890656946: {
        type: "string",
        required: false,
        childIds: [],
        name: "name",
        parentId: ""
      },
      1681890657595: {
        type: "number",
        required: false,
        childIds: [],
        name: "phone",
        parentId: ""
      },
      1681890680445: {
        type: "object",
        required: false,
        childIds: ["1681890689801", "1681890690236", "1681890690454"],
        name: "address",
        parentId: ""
      },
      1681890689801: {
        type: "number",
        required: false,
        childIds: [],
        name: "lane_no",
        parentId: "1681890680445"
      },
      1681890690236: {
        type: "string",
        required: false,
        childIds: [],
        name: "street_name",
        parentId: "1681890680445"
      },
      1681890690454: {
        type: "string",
        required: false,
        childIds: [],
        name: "colony\\",
        parentId: "1681890680445"
      }
    };

