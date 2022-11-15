module.exports = function(sequelize, dataTypes){

    let alias = 'Reserva'

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_reserva: {
            type: dataTypes.STRING
        },
        cantidad_personas: {
            type: dataTypes.STRING
        },
        fecha_check_in: {
            type: dataTypes.STRING
        },
        fecha_check_out: {
            type: dataTypes.STRING
        },
        persona_id: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'Reserva',
        timestamps: false
    }

    let Reserva = sequelize.define(alias, cols, config)

    Reserva.associate = function(models){
        Reserva.belongsTo(models.Persona, {
            as: 'reserva',
            foreignKey: 'persona_id'
        })
        Reserva.belongsToMany(models.Actividad, {
            as: 'actividades',
            through: 'Detalle_actividad',
            foreignKey: 'persona_id',
            otherKey: 'actividad_id',
            timestamps: false
        })
    }


    return Reserva

    
}