const db = require('../../config/db/connectioninspeccion');

const Vehicle = {
    getAllVehicles: (callback) => {
        const query = 'SELECT * FROM vehicle';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getVehiclebyPlate: (data, callback) => {
        const query = 'SELECT * FROM vehicle WHERE license_plate = ?'
        
        const { license_plate } = data;
        db.query(query, [license_plate],  (err, results) => {
            if(err){
                return callback(err, null);
            }
            callback(null, results);
        })
    },

    createVehicle: (newVehicle, callback) => {
        const query = `
            INSERT INTO vehicle (
                type, license_plate, brand, area, 
                soat_until, rtm_until, 
                seguro_contractual_until, seguro_extracontractual_until, 
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;
        
        const values = [
            newVehicle.type,
            newVehicle.license_plate,
            newVehicle.brand,
            newVehicle.area,
            newVehicle.soat_until,
            newVehicle.rtm_until,
            newVehicle.seguro_contractual_until,
            newVehicle.seguro_extracontractual_until
        ];
        
        db.query(query, values, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    updateVehicle: (updateVehicle, callback) => {
        const query = `
        UPDATE vehicle
        SET type = ?, license_plate = ?, brand = ?, area = ?, 
            soat_until = ?, rtm_until = ?, 
            seguro_contractual_until = ?, seguro_extracontractual_until = ?, 
            updated_at = NOW()
        WHERE vehicle_id = ?`;
        
        const values = [
            updateVehicle.type,
            updateVehicle.license_plate,
            updateVehicle.brand,
            updateVehicle.area,
            updateVehicle.soat_until,
            updateVehicle.rtm_until,
            updateVehicle.seguro_contractual_until,
            updateVehicle.seguro_extracontractual_until,
            updateVehicle.vehicle_id
        ];
        
        db.query(query, values, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    DeleteVehicle: (data, callback) => {
        const { vehicle_id } = data;
    
        // Desactivar las comprobaciones de claves foráneas
        db.query(`SET FOREIGN_KEY_CHECKS=0`, (err) => {
            if (err) {
                return callback(err, null);
            }
    
            const query = `DELETE FROM vehicle WHERE vehicle_id = ?`;
            db.query(query, [vehicle_id], (err, results) => {
                // Reactivar las comprobaciones de claves foráneas
                db.query(`SET FOREIGN_KEY_CHECKS=1`, (err2) => {
                    if (err2) {
                        return callback(err2, null);
                    }
                    if (err) {
                        return callback(err, null);
                    }
                    callback(null, results);
                });
            });
        });
    },
    
};

module.exports = Vehicle;
