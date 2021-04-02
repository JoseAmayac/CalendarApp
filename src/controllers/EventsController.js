const { response } = require('express');

const Event = require('../models/Event');

const getEvents = async (req, res = response)=>{
    try {
        const events = await Event.find()
                            .populate('user','name');

        return res.status(200).json({
            ok: true,
            events
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error en el servidor, por favor intente más tarde"
        })
    }
}

const createEvent = async (req, res = response)=>{
    try {
        let event = new Event(req.body);
        event.user = req.uid;

        const eventDB = await event.save();

        return res.status(201).json({
            ok: true,
            message: "Evento creado correctamente",
            event: eventDB
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error en el servidor, por favor intente más tarde"
        });
    }

}

const updateEvent = async (req, res)=>{
    const { id } = req.params;
    const uid = req.uid;
    try {
        const event = await Event.findById( id );

        if (!event) {
            return res.status(404).json({
                ok: false,
                message: "No existe un evento guardado con ese id"
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                message: "No tiene privilegios para editar este evento"
            });
        }

        const eventToUpdate = {
            ...req.body,
            user: uid
        };

        const eventUpdated = await Event.findByIdAndUpdate( id, eventToUpdate, { new:true } );
        
        return res.status(200).json({
            ok: true, 
            message: "Evento actualizado correctamente",
            event: eventUpdated
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error en el servidor, por favor intente más tarde"
        });
    }
}

const deleteEvent = async (req, res)=>{
    const { id } = req.params;
    const uid = req.uid;

    try {
        const event = await Event.findById( id );

        if (!event) {
            return res.status(404).json({
                ok: false,
                message: "No existe un evento guardado con ese id"
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                message: "No tiene privilegios para eliminar este evento"
            });
        }

        const deleted = await Event.findByIdAndDelete( id );

        return res.staus(200).json({
            ok: true,
            message: "Evento eliminado correctamente",
            event: deleted
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error en el servidor, por favor intente más tarde"
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}