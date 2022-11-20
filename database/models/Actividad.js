module.exports = function (sequelize, Datatypes) {
    let alias = "Actividad";

    let cols = {
        id: {
            type: Datatypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: {
            type: Datatypes.STRING(20)
        },
        tipo: {
            type: Datatypes.STRING(20)
        },
        valor: {
            type: Datatypes.INTEGER(20)
        },
        cantidad_maxima: {
            type: Datatypes.INTEGER(2)
        },
        imagen: {
            type: Datatypes.STRING(50)
        },
        descripcion: {
            type: Datatypes.STRING(500)
        }
    };

    let config = {freezeTableName: true, camelCase: false, timestamps: false};

    const Actividad = sequelize.define(alias, cols, config);

    Actividad.associate = function(models){
        
        Actividad.belongsToMany(models.Reserva, {
            as: 'reserva',
            through: 'Detalle_actividad',
            foreignKey: 'actividad_id',
            otherKey: 'reserva_id',
            timestamps: false
        });
        Actividad.belongsToMany(models.Hosteria, {
            as: 'hosteria_act',
            through: 'Hosteria_actividad',
            foreignKey: 'actividad_id',
            otherKey: 'hosteria_id',
            timestamps: false
        });
    }

    return Actividad;
}