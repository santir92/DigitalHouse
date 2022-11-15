module.exports = function(sequelize, dataTypes){

    let alias = 'Persona'

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        dni: {
            type: dataTypes.STRING
        },
        telefono: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: 'Persona',
        timestamps: false
    }

    let Persona = sequelize.define(alias, cols, config)

    Persona.associate = function(models){
        Persona.hasMany(models.Reserva, {
            as: 'reservas',
            foreignKey: 'persona_id'
        })
    }

    return Persona

    
}