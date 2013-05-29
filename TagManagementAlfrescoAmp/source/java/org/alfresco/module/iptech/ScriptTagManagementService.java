package org.alfresco.module.iptech;

import java.util.List;

import org.alfresco.repo.tagging.script.ScriptTaggingService;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.StoreRef;

public class ScriptTagManagementService extends ScriptTaggingService {


	/** Service Registry */
	private ServiceRegistry serviceRegistry;
	
    /**
     * Sets the Service Registry
     * 
     * @param serviceRegistry
     */
    public void setServiceRegistry(ServiceRegistry serviceRegistry)
    {
    	this.serviceRegistry = serviceRegistry;
    }
    
    /**
     * find nodes tagged by the given tag at the given store
     * 
     * @param store     store reference
     * @param tag       tag name
     * @return String[] tagged nodes
     */
    public NodeRef[] findTaggedNodes(String store, String tag)
    {
        StoreRef storeRef = new StoreRef(store);
        List<NodeRef> result = this.serviceRegistry.getTaggingService().findTaggedNodes(storeRef, tag);
        return (NodeRef[])result.toArray(new NodeRef[result.size()]);
    }
    
    /**
     * delete tag at the given store
     * 
     * @param store     store reference
     * @param tag       tag name
     */
    public void deleteTag(String store, String tag)
    {
        StoreRef storeRef = new StoreRef(store);
        this.serviceRegistry.getTaggingService().deleteTag(storeRef, tag);
    }
    
}
