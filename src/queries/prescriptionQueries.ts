const PrescriptionQueries = {
    createPrescription: "INSERT INTO prescriptions (user_id,name,dose,unit,drug_form,with_food,take_for) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",

};

export default PrescriptionQueries;